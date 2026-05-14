from pydantic import BaseModel, Field
from typing import Optional

class AadhaarOTPRequest(BaseModel):
    aadhaar_number: str = Field(..., pattern=r'^\d{12}$')

class AadhaarVerifyRequest(BaseModel):
    aadhaar_number: str = Field(..., pattern=r'^\d{12}$')
    otp: str = Field(..., min_length=6, max_length=6)

class KYCStatusResponse(BaseModel):
    status: str
    is_verified: bool
    details: Optional[dict] = None
