## Implementing file system using single component and url and state path string.

1. After clicking All Sessions, we need to update the directory path and also the url.
2. Component should update based on the url.
3. Component should remount everytime the link is clicked.
4. ComponentDidMount should resolve the path and information from the link.
5. Based on the information we need to update the directory tree.

List all the sessions

session1: {
List all the directories and files inside the path clicked.
folder1: {
Contains subdirectory information
}
file1,
file2
}
session2: {

}
session3: {

}

If we can populate this dictionary, we can easily grab the data from the cache instead of getting data from firestore every time.
