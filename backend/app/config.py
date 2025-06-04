import os
from dotenv import load_dotenv

load_dotenv()

AZURE_STORAGE_CONNECTION_STRING = "BlobEndpoint=https://datakyc.blob.core.windows.net/;QueueEndpoint=https://datakyc.queue.core.windows.net/;FileEndpoint=https://datakyc.file.core.windows.net/;TableEndpoint=https://datakyc.table.core.windows.net/;SharedAccessSignature=sv=2024-11-04&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-06-04T17:15:40Z&st=2025-06-04T09:15:40Z&spr=https&sig=BVUM9ydR5yUgJroiuAhH1HWylIuaGeG0OnS%2BLlzgORw%3D"
AZURE_CONTAINER_NAME = "docsandimages"


