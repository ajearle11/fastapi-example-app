from datetime import date
from sqlalchemy import String, Integer, Date
from sqlalchemy.orm import Mapped, mapped_column
from app.db import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(30))
    last_name: Mapped[str] = mapped_column(String(30), nullable=True)
    date_of_birth: Mapped[date] = mapped_column(Date)
    
    @property
    def age(self) -> int:
        today = date.today()
        years = today.year - self.date_of_birth.year

        if (today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day):
            years -= 1

        return years

    def __repr__(self) -> str:
        return (
            f"User(id={self.id!r}, first_name={self.first_name!r}, "
            f"last_name={self.last_name!r}, date_of_birth={self.date_of_birth!r})"
        )
