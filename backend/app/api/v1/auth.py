from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.user import UserCreate, UserLogin, Token
from app.db.mongodb import get_database
from app.core.security import get_password_hash, verify_password, create_access_token
from bson import ObjectId

router = APIRouter()

@router.post("/register", response_model=Token)
async def register(user_in: UserCreate, db = Depends(get_database)):
    # Check if user exists
    user = await db.users.find_one({"email": user_in.email})
    if user:
        raise HTTPException(
            status_code=400,
            detail="User already exists",
        )
    
    user_dict = user_in.dict()
    user_dict["password"] = get_password_hash(user_dict.pop("password"))
    
    result = await db.users.insert_one(user_dict)
    
    access_token = create_access_token(subject=str(result.inserted_id))
    return {"access_token": access_token, "token_type": "bearer", "role": user_in.role}

@router.post("/login", response_model=Token)
async def login(user_in: UserLogin, db = Depends(get_database)):
    user = await db.users.find_one({"email": user_in.email})
    if not user or not verify_password(user_in.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    access_token = create_access_token(subject=str(user["_id"]))
    return {"access_token": access_token, "token_type": "bearer", "role": user["role"]}
