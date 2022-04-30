import unittest

from helpers.crypt import HashDealer


class Tests(unittest.IsolatedAsyncioTestCase):
    async def test_hash_dealer(self):
        h = HashDealer()
        hashed = h.hash_password('test')
        self.assertTrue(h.verify_password('test', hashed))
        self.assertFalse(h.verify_password('nope', hashed))


if __name__ == '__main__':
    unittest.main()
