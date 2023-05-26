import os
import openai
import pinecone
from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from langchain.llms import OpenAI
from langchain.chains.question_answering import load_qa_chain
from dotenv import load_dotenv
from langchain.embeddings.openai import OpenAIEmbeddings


directory = '/home/ca/pincone/pdf_data'

def load_docs(directory):
  loader = DirectoryLoader(directory)
  documents = loader.load()
  return documents

documents = load_docs(directory)
len(documents)

def split_docs(documents, chunk_size=1000, chunk_overlap=20):
  text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
  docs = text_splitter.split_documents(documents)
  return docs

docs = split_docs(documents)
print(len(docs))

# Load environment variables from .env
load_dotenv()
open_api_key = os.environ.get('OPENAI_API_KEY')

# Set up the OpenAI embeddings object
embeddings = OpenAIEmbeddings(model="text-davinci-002")

# Define the text you want to embed
text = "Hello world"

# Get the embedding for the text
embedding = embeddings.embed_query(text)
print(len(embedding))


pinecone.init(
    api_key="526f4a9d-747a-4646-af5b-ba4ba1179cf2",
    environment="us-west4-gcp-free"
)

index_name = "repodex"

index = Pinecone.from_documents(docs, embeddings, index_name=index_name)

def get_similiar_docs(query, k=2, score=False):
  if score:
    similar_docs = index.similarity_search_with_score(query, k=k)
  else:
    similar_docs = index.similarity_search(query, k=k)
  return similar_docs

model_name = "text-davinci-003"
# model_name = "gpt-3.5-turbo"
#model_name = "gpt-4"
llm = OpenAI(model_name=model_name)

chain = load_qa_chain(llm, chain_type="stuff")

def get_answer(query):
  similar_docs = get_similiar_docs(query)
  answer = chain.run(input_documents=similar_docs, question=query)
  return answer

query = "WHO ARE KEY STAKEHOLDERS IN GENOMICS AND HOW ARE THEY INVOLVED IN POLICY DEVELOPMENT?"
answer = get_answer(query)
print(answer)


# from gensim.models import Word2Vec

# # Train a Word2Vec model
# sentences = [["I", "love", "pineapple"], ["I", "hate", "banana"], ["I", "like", "apple"]]
# model = Word2Vec(sentences, min_count=1)  # Adjust parameters as needed

# # Convert a string into a vector representation
# input_string = "I like pineapple"
# words = input_string.split()
# vector = sum(model.wv[word] for word in words) / len(words)

# print(vector)