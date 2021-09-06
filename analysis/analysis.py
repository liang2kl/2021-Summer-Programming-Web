import sys, os
from numpy.lib.npyio import save
sys.path.append(os.path.dirname(os.getcwd()))
from crawler.datatypes import VideoRecord
from matplotlib import pyplot
import numpy as np
from database import Database
from typing import List
from datetime import datetime

def save_plot(file_name):
    path = "./figs"
    if not os.path.isdir(path):
        os.mkdir(path)
    pyplot.savefig(f"{path}/{file_name}.svg")
    pyplot.close()


def plot_scatter(x, y, x_label, y_label, file_name,/, reverse_x=False, reverse_y=False, customize=None):
    pyplot.scatter(x, y)
    if customize:
        customize()
    pyplot.xlabel(x_label)
    pyplot.ylabel(y_label)
    if reverse_x:
        pyplot.gca().invert_xaxis()
    if reverse_y:
        pyplot.gca().invert_yaxis()
    
    save_plot(file_name)


def analyze(videos: List[VideoRecord]):
    data = {}
    begin_time = datetime.fromisoformat("2021-08-01 00:00:00")
    for index, video in enumerate(videos):
        time = datetime.fromisoformat(video.time)
        # The videos should be on the webiste for at least 10 days.
        if (time - begin_time).days > 20:
            continue
        
        play_num = 0
        if video.plays[-1:] == "万":
            play_num = int(float(video.plays[:-1]) * 10000)
        else:
            play_num = int(video.plays)

        if video.author_id in data:
            data[video.author_id]["ranks"].append(index + 1)
            data[video.author_id]["plays"] += play_num
        else:
            data[video.author_id] = {}
            data[video.author_id]["ranks"] = [index + 1]
            data[video.author_id]["plays"] = play_num
    
    for author in data:
        data[author]["ranks"] = np.array(data[author]["ranks"])
        data[author]["plays"] = np.array(data[author]["plays"])
        data[author]["avg_rank"] = np.mean(data[author]["ranks"])
        data[author]["highest_rank"] = np.min(data[author]["ranks"])
        data[author]["avg_plays"] = data[author]["plays"] / data[author]["ranks"].size
        data[author]["videos_num"] = data[author]["ranks"].size
        data[author]["ranks_stddev"] = np.std(data[author]["ranks"])

    plot_scatter([data[author]["avg_rank"] for author in data
                  if data[author]["ranks"].size > 4],
                 [data[author]["ranks_stddev"] for author in data
                  if data[author]["ranks"].size > 4],
                 "Avg. Ranking", "Ranks Std. Dev.", "avg_rank_rank_stddev")

    plot_scatter([data[author]["highest_rank"] for author in data
                  if data[author]["ranks"].size > 4],
                 [data[author]["ranks_stddev"] for author in data
                  if data[author]["ranks"].size > 4],
                 "Highest Ranking", "Ranks Std. Dev.", "highest_rank_rank_stddev",
                 customize=lambda: pyplot.vlines(x=200, ymin=0, ymax=1700, linewidth=1, color='r'))

    plot_scatter([data[author]["avg_rank"] for author in data
                  if data[author]["ranks"].size > 4],
                 [data[author]["highest_rank"] for author in data
                  if data[author]["ranks"].size > 4],
                 "Avg. Ranking", "Highest Ranking", "avg_rank_highest_rank",
                 customize=lambda: pyplot.hlines(y=200, xmin=0, xmax=3000, linewidth=1, color='r'))

    plays = [np.log(data[author]["avg_plays"])
             for author in data if data[author]["avg_plays"] < 1e6]

    pyplot.hist(plays, density=True, bins=75)
    pyplot.xlabel(r"$\log(Average Plays)$")
    save_plot("plays_hist")


if __name__ == "__main__":
    db = Database()
    videos = db.select_all_videos()
    analyze(videos.copy())
