from typing import List
from fastapi import FastAPI, Depends, status, HTTPException, Request
from fastapi.responses import JSONResponse
from app.db import SessionLocal, Base, engine
from app.schemas import UserRead, UserCreate
from app.models import User
from sqlalchemy import select
import logging 
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(lifespan=lifespan)


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://frontend:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       
    allow_credentials=True,       
    allow_methods=["*"],           
    allow_headers=["*"],            
)

async def get_db():
    async with SessionLocal() as db:
        try:
            yield db
        finally:
            await db.close()
            

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.exception(f"Unhandled error for {request.url}: {exc}")

    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


# GET /users - list all users
@app.get("/users", response_model=list[UserRead])
async def list_users(db = Depends(get_db)):
    result = await db.execute(select(User))   
    users: List[User] = result.scalars().all()            
    return users


# POST /users - create a new user
@app.post("/users", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def create_user(user_to_create: UserCreate, db = Depends(get_db)):
    user: User = User(
        first_name=user_to_create.first_name,
        last_name=user_to_create.last_name,
        age=user_to_create.age,
        date_of_birth=user_to_create.date_of_birth,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


# DELETE /users/:id - delete by id
@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int, db = Depends(get_db)):
    result = await db.execute(
        select(User).where(User.id == user_id)
    )
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    await db.delete(user)
    await db.commit()
    return None
