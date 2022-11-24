from faker import Faker

f = Faker('jp-JP')

f.text()


def fake_title() -> str:
    return f.text(25)


def fake_url() -> str:
    return f.url()


def fake_snippet() -> str:
    return f.text().replace("\n", "")


for i in range(10):
    print(f"title: \"{fake_title()}\", url: \"{fake_url()}\", snippet: \"{fake_snippet()}\"")
