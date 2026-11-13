


const username = process.argv[2];

async function fetchGitHubActivity(username) {
  if (!username) {
    console.log("Usage: github-activity <username>");
    return;
  }

  const url = `https://api.github.com/users/${encodeURIComponent(username)}/events`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "github-activity-cli"
      }
    });

    if (response.status === 404) {
      console.log(`Error: GitHub user "${username}" was not found.`);
      return;
    }

    if (response.status === 403) {
      console.log("Error: GitHub API rate limit exceeded or access denied.");
      return;
    }

    if (!response.ok) {
      console.log(`Error: GitHub API returned status ${response.status}.`);
      return;
    }

    const events = await response.json();

    if (events.length === 0) {
      console.log(`No recent activity found for ${username}.`);
      return;
    }

    console.log(`Recent activity for ${username}:\n`);

    events.forEach((event) => {
      const repo = event.repo.name;

      switch (event.type) {
        case "PushEvent": {
          const commits = event.payload.commits?.length || 0;
          console.log(`- Pushed ${commits} commits to ${repo}`);
          break;
        }

        case "IssuesEvent":
          console.log(`- ${event.payload.action} an issue in ${repo}`);
          break;

        case "WatchEvent":
          console.log(`- Starred ${repo}`);
          break;

        case "ForkEvent":
          console.log(`- Forked ${repo}`);
          break;

        case "CreateEvent":
          console.log(`- Created ${event.payload.ref_type} in ${repo}`);
          break;

        case "PullRequestEvent":
          console.log(`- ${event.payload.action} a pull request in ${repo}`);
          break;

        case "IssueCommentEvent":
          console.log(`- Commented on an issue in ${repo}`);
          break;

        case "DeleteEvent":
          console.log(`- Deleted ${event.payload.ref_type} in ${repo}`);
          break;

        case "ReleaseEvent":
          console.log(`- Published a release in ${repo}`);
          break;

        default:
          console.log(`- ${event.type} in ${repo}`);
      }
    });

  } catch (error) {
    console.log("Error: Unable to connect to GitHub API.");
    console.log(error.message);
  }
}

fetchGitHubActivity(username);
