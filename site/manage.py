#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

import json
from video.bilibilicrawler import BilibiliCrawler
from video.database import Database

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'videosite.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
    config_file_path = "crawler/config.json"
    config = json.loads(open(config_file_path, "r").read())

    page_stride = config["stride"]
    page_offset = config["current_offset"]
    max_pages = config["max_pages"]

    craler = BilibiliCrawler("2021-08-01", "2021-08-31",
                            pages=page_stride, offset=page_offset)

    db = Database()

    for offset in range(page_offset, max_pages - page_stride, page_stride):
        craler.offset = page_offset
        records = craler.crawlVideoRecords()
        db.insert_video_records(records)
        page_offset += page_stride

        json_data = json.dumps({"stride": page_stride,
                                "max_pages": max_pages,
                                "current_offset": page_offset})

        config_file = open(config_file_path, "w")
        config_file.write(json_data)
        config_file.close()
        print(f"Current offset: {page_offset}")
