import os
import logging
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)


class Settings:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    CHROMA_DB_PATH = "chroma_db"

    def __init__(self):
        if not self.GEMINI_API_KEY:
            logger.warning(
                "GEMINI_API_KEY is not set. Resume analysis features will fail."
            )


settings = Settings()
