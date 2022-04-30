import os

from cryptography.exceptions import InvalidKey
from cryptography.hazmat.primitives.kdf.scrypt import Scrypt
import secrets


class TokenGenerator:
    def __init__(self, token_length=32):
        self.token_length = token_length

    def generate(self) -> str:
        return secrets.token_urlsafe(self.token_length)


class HashDealer:
    def __init__(self,
                 kdf_length=32,
                 n_cost_factor=14,
                 r_block_size=8,
                 p_parallelization=1,
                 salt_length=16):
        """
        :param kdf_length: The desired length of the derived key in bytes
        :param n_cost_factor: CPU/Memory cost parameter. Will be calculated as a power of 2
        :param r_block_size: Block size parameter
        :param p_parallelization: Parallelization parameter
        :param salt_length: The desired length of the salt in bytes
        """
        self.kdf_length = kdf_length
        self.n_cost_factor = n_cost_factor
        self.r_block_size = r_block_size
        self.p_parallelization = p_parallelization
        self.salt_length = salt_length

    def _create_kdf(self, salt: bytes) -> Scrypt:
        return Scrypt(
            salt=salt,
            length=self.kdf_length,
            n=2 ** self.n_cost_factor,
            r=self.r_block_size,
            p=self.p_parallelization
        )

    def hash_password(self, password: str) -> str:
        salt = os.urandom(self.salt_length)
        kdf = self._create_kdf(salt)
        hashed = kdf.derive(password.encode('utf-8'))
        return (salt + hashed).hex()

    def verify_password(self, password: str, hashed_password: str) -> bool:
        hashed_password_bytes = bytes.fromhex(hashed_password)
        salt = hashed_password_bytes[:self.salt_length]
        kdf = self._create_kdf(salt)
        hashed = hashed_password_bytes[self.salt_length:]
        try:
            kdf.verify(password.encode('utf-8'), hashed)
            return True
        except InvalidKey:
            return False
