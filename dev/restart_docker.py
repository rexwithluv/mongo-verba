import subprocess


def main() -> None:
    try:
        subprocess.run(
            ["docker", "compose", "down", "-v", "--rmi", "local"],
            check=True,
        )

        subprocess.run(
            ["docker", "compose", "up", "-d", "--build"],
            check=True,
        )

    except subprocess.CalledProcessError as e:
        print(f"Error reiniciando los contenedores docker: {e.stderr}")


main()
