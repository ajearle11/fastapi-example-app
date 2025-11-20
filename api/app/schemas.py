from datetime import date
from pydantic import BaseModel, ConfigDict

class UserCreate(BaseModel):
    first_name: str
    last_name: str = None
    age: int
    date_of_birth: date
    
    model_config = ConfigDict(from_attributes=True)


class UserRead(UserCreate):
    id: int

