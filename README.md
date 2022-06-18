# Syncwatch2

## Installation

### Setup in Unix

> Install requirements

    pip3 install -r requirements.txt

> Copy "settings_example.py" to "settings.py"

    cp settings_example.py settings.py

> Edit your settings.py

> Start the server

    python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --log-level warning

 
## Settings
- DATABASE_URL
- WEBSERVER_PORT
- WEBSERVER_STATIC_PATH
- WEBSERVER_DEBUG
- WEBSERVER_LOGGING_LEVEL
- TOKEN_LENGTH
- HASH_KDF_LENGTH
- HASH_N_COST_FACTOR
- HASH_R_BLOCK_SIZE
- HASH_P_PARALLELIZATION
- HASH_SALT_LENGTH
- TOKEN_EXPIRES_DAYS (-1)
