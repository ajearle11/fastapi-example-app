from sqlalchemy.orm import declarative_base
from sqlalchemy.ext.asyncio import (
    create_async_engine,
    async_sessionmaker
)
from sqlalchemy.orm import declarative_base

DATABASE_URL = "postgresql+asyncpg://user:mypassword@localhost:5432/fastapidb"

engine = create_async_engine(
    DATABASE_URL,
    future=True,
)

SessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
