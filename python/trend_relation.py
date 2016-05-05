## trend_relation.py

import sys, json, numpy as np
import time
import re
from trend import Trend
import json
from pymongo import MongoClient
import pymongo
from itertools import islice
import operator
import math
import getopt

def take(n, iterable):
    "Return first n items of the iterable as a list"
    return list(islice(iterable, n))

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])


def main():
	db = MongoClient().test_database

	n = 0.0
	QUERY = read_in()

	first = Trend()
	first.setName(QUERY)
	for tweet in db.tweets.find({"entities.hashtags.text": re.compile(QUERY, re.IGNORECASE)}).sort([("_id", pymongo.DESCENDING)]):
		trend_in_tweet = False
		for hashtag in tweet["entities"]["hashtags"]:
			if hashtag['text'].encode("utf-8").lower() != QUERY.lower():
				first.addToRelated(hashtag['text'].encode("utf-8").lower(),1)
		n = n + 1

	print QUERY.lower(), ": ", str(n)
	top_10 = sorted(first.getRelated().items(), key=operator.itemgetter(1), reverse=True)

	for top in top_10:
		print top[0], ": ", float(top[1])/n 
	first.clear()

#start process
if __name__ == '__main__':
    main()