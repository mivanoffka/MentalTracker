from django.test import TestCase, Client
from .models import Account, Token
import hashlib
import json


class AccountTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.username = "testuser"
        self.password = "testpassword"
        self.password_hash = hashlib.sha256(self.password.encode()).hexdigest()
        self.account = Account.objects.create(
            username=self.username, password_hash=self.password_hash
        )

    def test_sign_up_success(self):
        response = self.client.post(
            "/accounts/signup/",
            data=json.dumps({"username": "newuser", "password": "newpassword"}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(int(response.json()["status"]), 0)
        self.assertEqual(Account.objects.filter(username="newuser").count(), 1)

    def test_sign_up_user_already_exists(self):
        response = self.client.post(
            "/accounts/signup/",
            data=json.dumps({"username": self.username, "password": "newpassword"}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(int(response.json()["status"]), 2)
        self.assertEqual(Account.objects.filter(username=self.username).count(), 1)

    def test_sign_in_success(self):
        response = self.client.post(
            "/accounts/signin/",
            data=json.dumps({"username": self.username, "password": self.password}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(int(response.json()["status"]), 0)
        self.assertIn("token", response.json()["content"])

    def test_sign_in_incorrect_password(self):
        response = self.client.post(
            "/accounts/signin/",
            data=json.dumps({"username": self.username, "password": "wrongpassword"}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(int(response.json()["status"]), 4)

    def test_sign_in_incorrect_username(self):
        response = self.client.post(
            "/accounts/signin/",
            data=json.dumps({"username": "nonexistent", "password": "somepassword"}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(int(response.json()["status"]), 3)

    def test_reset_success(self):
        response = self.client.post("/accounts/reset/", content_type="application/json")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(int(response.json()["status"]), 0)
        self.assertEqual(Account.objects.count(), 0)
        self.assertEqual(Token.objects.count(), 0)
