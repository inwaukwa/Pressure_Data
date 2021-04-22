#! /usr/bin/env python3
import csv
import json
import sys


def count_contractions(pressure_data):
    """
    Count the number of contractions for a pressure curve

    :param pressure_data: a list of pressure points
    :return: The total number of contractions
    """

    up = 0
    down = 0
    contractions = 0
    for row in pressure_data:
        if row["pressure"] > 95.0:
            up = 1
        elif row["pressure"] < 85.0:
            down = 1
        if up == 1 and down == 1 and row["pressure"] > 95.0:
            up = 0
            down = 0
            contractions += 1

    return contractions


def contractions_per_sec(pressure_data):
    """
    Calculate the mean contractions / secs for a pressure curve

    :param pressure_data: a list of pressure points
    :return: The mean frequency of contraction / secs
    """

    up = 0
    down = 0
    contractions = 0
    for row in pressure_data:
        if row["pressure"] > 95.0:
            up = 1
        elif row["pressure"] < 85.0:
            down = 1
        if up == 1 and down == 1 and row["pressure"] > 95.0:
            up = 0
            down = 0
            contractions += 1

    return round(contractions / (pressure_data[-1]["ms"] / 1000), 1)


def main():
    pressure_file = sys.argv[1]
    items = []
    first = ""
    second = ""
    # print("---")
    with open(pressure_file) as csvDataFile:
        csvReader = csv.reader(csvDataFile)
        for row in csvReader:
            try:
                items.append({first: float(row[0]), second: float(row[1])})
            except ValueError:
                first = row[0]
                second = row[1]
    # print("For {}:".format(pressure_file))
    # print("* Number of contraction = {}".format(count_contractions(items)))
    # print("* Contraction / s = {}".format(contractions_per_sec(items)))

    csvDataFile.close()

    final = {"pressure_points": items, "count_contractions": count_contractions(items),
             "contractions_per_sec": contractions_per_sec(items)}

    jsonStr = json.dumps(final, indent=4)
    # print(jsonStr)

    file = open(sys.argv[2], 'w')
    file.write(jsonStr)
    file.close()

    return 0


if __name__ == '__main__':
    sys.exit(main())
