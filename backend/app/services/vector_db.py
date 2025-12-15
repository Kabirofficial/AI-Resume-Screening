import chromadb
from app.config import settings

client = chromadb.PersistentClient(path=settings.CHROMA_DB_PATH)
collection = client.get_or_create_collection(name="resume_embeddings")

def add_resume(text: str, filename: str):
    collection.add(
        documents=[text],
        metadatas=[{"filename": filename}],
        ids=[filename]
    )

def query_resumes(query_text: str, n_results: int = 3):
    results = collection.query(
        query_texts=[query_text],
        n_results=n_results
    )
    return results