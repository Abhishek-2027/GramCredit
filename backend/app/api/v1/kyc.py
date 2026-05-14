from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.kyc import AadhaarOTPRequest, AadhaarVerifyRequest, KYCStatusResponse
from app.db.mongodb import get_database
from app.core.config import settings
from app.core.security import create_access_token # Using for auth verification later
from bson import ObjectId
import logging

router = APIRouter()

@router.post("/aadhaar/send-otp")
async def send_aadhaar_otp(request: AadhaarOTPRequest):
    # In a real scenario, this would call UIDAI or a provider (Signzy/Decentro)
    logging.info(f"Sending OTP for Aadhaar: {request.aadhaar_number}")
    return {"message": "OTP sent successfully to registered mobile number", "aadhaar_masked": f"XXXXXXXX{request.aadhaar_number[-4:]}"}

@router.post("/aadhaar/verify", response_model=KYCStatusResponse)
async def verify_aadhaar_otp(request: AadhaarVerifyRequest, db = Depends(get_database)):
    # Mock validation
    if request.otp != settings.MOCK_AADHAAR_OTP:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP. Please use '123456' for testing."
        )
    
    # Mock data returned from "UIDAI"
    mock_data = {
        "full_name": "Test User",
        "dob": "1990-01-01",
        "gender": "Male",
        "address": "123, Rural Village, Dist. Allahabad, UP",
        "aadhaar_masked": f"XXXXXXXX{request.aadhaar_number[-4:]}"
    }
    
    # In real app, we would update the user profile here
    # await db.users.update_one({"_id": ...}, {"$set": {"kyc_verified": True, "profile": mock_data}})
    
    return {
        "status": "success",
        "is_verified": True,
        "details": mock_data
    }
