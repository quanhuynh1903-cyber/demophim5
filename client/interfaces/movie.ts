from dataclasses import dataclass
from typing import List, Optional

@dataclass
class Review:
    id: str
    user: str
    name: str
    rating: float
    comment: str
    created_at: str

@dataclass
class Actor:
    id: str
    name: str
    birth: str
    sex: bool
    image: str
    description: str
    created_at: str

@dataclass
class Movie:
    id: str
    name: str
    genres: str
    image: str
    description: str
    actors: List[Actor]
    released_at: str
    times: int
    url: str
    views: int
    rating: float
    num_reviews: int
    reviews: List[Review]
    created_at: str
