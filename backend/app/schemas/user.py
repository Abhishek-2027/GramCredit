from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from enum import Enum

class UserRole(str, Enum):
    BORROWER = "borrower"
    AGENT = "agent"
    ADMIN = "admin"
    LENDER = "lender"

class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    role: UserRole = UserRole.BORROWER

class UserCreate(UserBase):
    email: EmailStr
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str

class UserResponse(UserBase):
    id: str = Field(..., alias="_id")

    class Config:
        populate_by_name = True
