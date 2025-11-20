import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from app.main import app, get_db
from app.db import Base

TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"
test_engine = create_async_engine(TEST_DATABASE_URL, echo=False)
TestingSessionLocal = async_sessionmaker(test_engine, expire_on_commit=False)


@pytest.fixture(scope="module", autouse=True)
async def setup_test_db():
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


async def override_get_db():
    async with TestingSessionLocal() as session:
        yield session


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture
async def created_user():
    """Fixture that creates a user and returns its data."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        payload = {
            "first_name": "Test",
            "last_name": "User",
            "age": 99,
            "date_of_birth": "1900-01-01",
        }
        response = await ac.post("/users", json=payload)
        assert response.status_code == 201
        return response.json()


@pytest.mark.anyio
async def test_create_user():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        payload = {
            "first_name": "Alice",
            "last_name": "Smith",
            "age": 30,
            "date_of_birth": "1995-01-02",
        }
        response = await ac.post("/users", json=payload)

    assert response.status_code == 201
    data = response.json()
    assert data["id"] > 0
    assert data["first_name"] == "Alice"
    assert data["last_name"] == "Smith"
    assert data["age"] == 30
    assert data["date_of_birth"] == "1995-01-02"


@pytest.mark.anyio
async def test_list_users(created_user):
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/users")

    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    assert any(user["first_name"] == "Test" for user in data)
    assert any(user["id"] == created_user["id"] for user in data)


@pytest.mark.anyio
async def test_delete_user():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        payload = {
            "first_name": "Bob",
            "last_name": "Jones",
            "age": 40,
            "date_of_birth": "1985-05-05",
        }
        create_resp = await ac.post("/users", json=payload)
        user_id = create_resp.json()["id"]

        delete_resp = await ac.delete(f"/users/{user_id}")
    assert delete_resp.status_code == 204

    # Verify it's gone
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        list_resp = await ac.get("/users")
    users = list_resp.json()
    assert all(u["id"] != user_id for u in users)


@pytest.mark.anyio
async def test_delete_nonexistent_user_returns_404():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.delete("/users/99999")  # unlikely to exist

    assert response.status_code == 404
    assert response.json()["detail"] == "User not found"


@pytest.mark.anyio
async def test_create_user_invalid_payload_returns_422():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # Missing required fields like last_name, age, date_of_birth
        payload = {"first_name": "Invalid"}
        response = await ac.post("/users", json=payload)

    assert response.status_code == 422  # FastAPI validation error
