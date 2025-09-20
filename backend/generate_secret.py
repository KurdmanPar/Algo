# This is a simple python script that generates a
# random 50 character long secret key using the secrets module.

import secrets
print(secrets.token_urlsafe(50))

