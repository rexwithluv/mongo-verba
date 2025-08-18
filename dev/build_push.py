# Should run in root of the project

from subprocess import CalledProcessError, run
from typing import List


def build_and_push(directory: str, gh_user: str) -> None:
    try:
        run(
            [
                "docker",
                "buildx",
                "build",
                "--push",
                "--tag",
                f"ghcr.io/{gh_user}/mongo-verba-{directory}:test",
                directory,
            ],
            check=True,
        )
    except CalledProcessError as e:
        print(f"An error occurred while build or push the docker image of {directory}")
        print(f"Details: {e.stderr}")


def main(gh_user: str) -> None:
    directories: List[str] = ["frontend", "backend"]

    for dir in directories:
        build_and_push(dir, gh_user)


if __name__ == "__main__":
    GITHUB_USER = "rexwithluv"
    main(GITHUB_USER)
