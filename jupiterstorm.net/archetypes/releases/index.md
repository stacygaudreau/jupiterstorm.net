---
type: 'release'
date: '{{ .Date }}' # publish date
draft: true 
releaseDate: '{{ .Date }}' # release date
title: '{{ replace .File.ContentBaseName "-" " " | title }}' # track title
contrib: []     # list of contributing artists (if any)
remix: false    # true if it is a remix
remixArtist: '' # name of artist that was remixed
releaseType: 'single'      # single/EP/LP
tracks: []      # tracklist if not single
label: 'Label Name' # name of label
previewUrl: '/audio/testaudio.wav'  # embedded audio preview file path
streamUrl: 'https://spotify.com'    # link to recommended streaming platform to listen
buyUrl: 'https://beatport.com'      # recommended purchase URL
---

This is the description of a new release from **Jupiter Storm**. 

Here is some _italic_ text in another paragraph, as part of the description body.

