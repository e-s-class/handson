docker exec -it cockroachdb /bin/bash
./cockroach sql --insecure --user=root --port=26257 < /web/handson/middleware/cockroachDB/seed-script.sql

exit
