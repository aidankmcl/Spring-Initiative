
from pymongo import MongoClient
client = MongoClient('localhost', 27017)


def prep_note(raw_note):
    """
    Apply whatever data editing is required for
    slipping into notes collection
    """
    period = raw_note.get("period", "Daily")
    raw_note["noteType"] = period if not period == "Daily" else "Daily Entry"
    return raw_note


new_notes = [prep_note(note) for note in client["spring-initiative"]["forms"].find()]
print new_notes[0]
print client["test"]["notes"].insert_many(new_notes)
