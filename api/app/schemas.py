from datetime import date
from pydantic import BaseModel, ConfigDict, Field

def to_camel(string: str) -> str:
    parts = string.split("_")
    return parts[0] + "".join(word.capitalize() for word in parts[1:])

class UserCreate(BaseModel):
    first_name: str = Field(..., alias="firstName")
    last_name: str = Field(None, alias="lastName")
    date_of_birth: date = Field(..., alias="dateOfBirth")

    model_config = ConfigDict(
        from_attributes=True, populate_by_name=True, alias_generator=to_camel
    )


class UserRead(UserCreate):
    id: int
    age: int
