from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "GRAMCREDIT"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "supersecretkeychangeitforproduction"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "gramcredit"

    # Aadhaar Mock Settings
    MOCK_AADHAAR_OTP: str = "123456"

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
