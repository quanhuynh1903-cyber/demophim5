from dataclasses import dataclass
from typing import Optional

@dataclass
class User:
    """Tương đương export interface User"""
    id: str
    name: str
    email: str
    is_admin: bool

@dataclass
class TokenUser(User):
    """Tương đương export interface TokenUser"""
    token: str

@dataclass
class PasswordUser(User):
    """Tương đương export interface PasswordUser"""
    password: str
