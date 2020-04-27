from gensim.models import word2vec
from gensim.similarities.index import AnnoyIndexer
import numpy as np


model = word2vec.Word2Vec.load("recipes.model")
indexer = AnnoyIndexer(model, 2)

print(model.most_similar('1', topn=5, indexer=indexer))
