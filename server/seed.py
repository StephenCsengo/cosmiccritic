#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Book, Author, Review

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Deleting all User, Book, and Author records")
        User.query.delete()
        Book.query.delete()
        Author.query.delete()
        Review.query.delete()
        # db.session.commit()

        # Seed code goes here!

        users = []
        usernames = []
        for num in range(60):
            username = fake.first_name()
            while username in usernames:
                username = fake.first_name()
            usernames.append(username)

            user = User(username=username)
            user.password_hash = user.username + "hash"

            users.append(user)

        for user in users:
            db.session.add(user)
            # db.session.commit()

        print("User seed complete.")

        authors = [
            "Isaac Asimov",
            "Arthur C. Clarke",
            "Philip K. Dick",
            "H.G. Wells",
            "Ray Bradbury",
            "Robert A. Heinlein",
            "Ursula K. Le Guin",
            "Frank Herbert",
            "H.P. Lovecraft",
            "William Gibson",
            "Neal Stephenson",
            "Philip Jose Farmer",
            "Kurt Vonnegut",
            "Aldous Huxley",
            "Stanislaw Lem",
            "Orson Scott Card",
            "Jules Verne",
            "Octavia E. Butler",
            "Poul Anderson",
            "Connie Willis",
        ]

        for author in authors:
            add_author = Author(name=author)
            db.session.add(add_author)
            # db.session.commit()
        print("Author seeding complete")

        science_fiction_books = [
            Book(
                title="Foundation",
                desc="In a future Galactic Empire, mathematician Hari Seldon predicts its fall and establishes the Foundation, a group tasked with preserving knowledge and shortening the dark age that follows.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1417900846i/29579.jpg",
                page_count=255,
                publish_year=1951,
                author_id=1,
            ),
            Book(
                title="2001: A Space Odyssey",
                desc="A mysterious monolith is discovered on the moon, leading a team of astronauts and their sentient computer HAL to a journey of cosmic evolution and human transcendence.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1432468943i/70535.jpg",
                page_count=297,
                publish_year=1968,
                author_id=2,
            ),
            Book(
                title="Do Androids Dream of Electric Sheep?",
                desc="n a post-apocalyptic world, bounty hunter Rick Deckard is tasked with 'retiring' rogue androids who have developed human-like emotions and identities.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1357936711i/6696927.jpg",
                page_count=210,
                publish_year=1968,
                author_id=3,
            ),
            Book(
                title="The War of the Worlds",
                desc="Earth is invaded by Martians wielding advanced technology, and humanity struggles to survive in the face of this extraterrestrial threat.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320391644i/8909.jpg",
                page_count=192,
                publish_year=1898,
                author_id=4,
            ),
            Book(
                title="Fahrenheit 451",
                desc="In a dystopian society, fireman Guy Montag burns books as a means of suppressing dissent, until he rebels against the oppressive regime.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1383718290i/13079982.jpg",
                page_count=227,
                publish_year=1953,
                author_id=5,
            ),
            Book(
                title="Stranger in a Strange Land",
                desc="Valentine Michael Smith, born on Mars and possessing strange abilities, returns to Earth, sparking a cultural revolution and religious awakening.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1156897088i/350.jpg",
                page_count=528,
                publish_year=1961,
                author_id=6,
            ),
            Book(
                title="The Left Hand of Darkness",
                desc="A diplomat navigates the complex politics of the androgynous inhabitants of the planet Gethen, exploring themes of gender and identity.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1488213612i/18423.jpg",
                page_count=304,
                publish_year=1969,
                author_id=7,
            ),
            Book(
                title="Dune",
                desc="On the desert planet of Arrakis, young Paul Atreides becomes embroiled in a power struggle for control over the valuable spice melange, prophesied to hold the key to humanity's future.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg",
                page_count=412,
                publish_year=1965,
                author_id=8,
            ),
            Book(
                title="At the Mountains of Madness",
                desc="An Antarctic expedition uncovers ancient, alien horrors beneath the ice, leading to madness and terror.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388341769i/32767.jpg",
                page_count=224,
                publish_year=1931,
                author_id=9,
            ),
            Book(
                title="Neuromancer",
                desc="Hacker Case is hired for a job that blurs the lines between reality and cyberspace, delving into a world of artificial intelligence and corporate intrigue.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554437249i/6088007.jpg",
                page_count=271,
                publish_year=1984,
                author_id=10,
            ),
            Book(
                title="Snow Crash",
                desc="In a future America, Hiro Protagonist navigates a virtual-reality metaverse and investigates a new drug called Snow Crash with the potential to disrupt both the virtual and real worlds.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1589842551i/40651883.jpg",
                page_count=470,
                publish_year=1992,
                author_id=11,
            ),
            Book(
                title="To Your Scattered Bodies Go",
                desc="After death, individuals awaken in a mysterious river valley, resurrected with others throughout history, as they seek to uncover the purpose behind their strange afterlife.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327657439i/189147.jpg",
                page_count=221,
                publish_year=1971,
                author_id=12,
            ),
            Book(
                title="Slaughterhouse-Five",
                desc="Billy Pilgrim becomes unstuck in time, experiencing moments from his life out of sequence, including his time as a soldier in World War II.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1440319389i/4981.jpg",
                page_count=215,
                publish_year=1969,
                author_id=13,
            ),
            Book(
                title="Brave New World",
                desc="In a highly controlled and pleasure-driven society, citizens grapple with the consequences of their engineered existence.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1498631519i/95558.jpg",
                page_count=288,
                publish_year=1932,
                author_id=14,
            ),
            Book(
                title="Solaris",
                desc="A space crew studying a mysterious planet encounters enigmatic and sometimes disturbing manifestations of their deepest desires and regrets.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1498631519i/95558.jpg",
                page_count=204,
                publish_year=1961,
                author_id=15,
            ),
            Book(
                title="Ender's Game",
                desc="Gifted child prodigy Ender Wiggin is recruited to train at a military academy to fight an impending alien invasion, but the training becomes more intense than he could have imagined.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1408303130i/375802.jpg",
                page_count=324,
                publish_year=1985,
                author_id=16,
            ),
            Book(
                title="Twenty Thousand Leagues Under the Sea",
                desc="Captain Nemo takes Professor Aronnax and his companions on a remarkable underwater journey aboard the advanced submarine, the Nautilus.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1494979127i/33507.jpg",
                page_count=336,
                publish_year=1870,
                author_id=17,
            ),
            Book(
                title="Kindred",
                desc="Dana, a black woman in the 1970s, is inexplicably transported back in time to a pre-Civil War plantation, where she confronts the brutal realities of slavery.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1339423248i/60931.jpg",
                page_count=287,
                publish_year=1979,
                author_id=18,
            ),
            Book(
                title="Tau Zero",
                desc="A spaceship crew hurtles through space, facing the challenges of relativistic time dilation as they struggle to survive in a universe of accelerating change.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1389216838i/240617.jpg",
                page_count=224,
                publish_year=1970,
                author_id=19,
            ),
            Book(
                title="Doomsday Book",
                desc="In a future where time travel is possible, a historian is accidentally sent back to the midst of the Black Plague, facing both the horrors of the past and a present crisis.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1403972500i/24983.jpg",
                page_count=592,
                publish_year=1992,
                author_id=20,
            ),
            Book(
                title="Pebble in the Sky",
                desc="A retired tailor is unwittingly thrust into an interstellar conflict and discovers a secret that could change the fate of humanity.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1335782053i/41820.jpg",
                page_count=256,
                publish_year=1950,
                author_id=1,
            ),
            Book(
                title="Childhood's End",
                desc="Mysterious extraterrestrials called the Overlords arrive on Earth, guiding humanity towards a new era, but at a profound cost.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320552628i/414999.jpg",
                page_count=224,
                publish_year=1953,
                author_id=2,
            ),
            Book(
                title="Ubik",
                desc="In a reality-bending world, a group of individuals struggle to maintain their identities and sanity as the boundaries of time, space, and existence blur.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327995569i/22590.jpg",
                page_count=224,
                publish_year=1969,
                author_id=3,
            ),
            Book(
                title="The Time Machine",
                desc="The Time Traveller journeys to a distant future where he encounters the enigmatic Eloi and the sinister Morlocks, revealing the fate of humanity.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327942880i/2493.jpg",
                page_count=84,
                publish_year=1895,
                author_id=4,
            ),
            Book(
                title="The Martian Chronicles",
                desc="A series of interconnected short stories depict the colonization and subsequent abandonment of Mars, exploring themes of human nature and the consequences of expansion.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1661016554i/76778.jpg",
                page_count=182,
                publish_year=1950,
                author_id=5,
            ),
            Book(
                title="Starship Troopers",
                desc="In a militaristic future, young Juan 'Johnny' Rico joins the Mobile Infantry to fight against an insectoid alien species in an interstellar war.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1614054412i/17214.jpg",
                page_count=335,
                publish_year=1959,
                author_id=6,
            ),
            Book(
                title="The Dispossessed",
                desc="Physicist Shevek travels between two contrasting worlds, Anarres and Urras, exploring the social and political implications of their differing ideologies.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353467455i/13651.jpg",
                page_count=387,
                publish_year=1974,
                author_id=7,
            ),
            Book(
                title="Children of Dune",
                desc="The Atreides legacy continues as Paul's children navigate a complex web of political intrigue and ecological challenges on the desert planet of Arrakis.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1564783201i/44492286.jpg",
                page_count=408,
                publish_year=1976,
                author_id=8,
            ),
            Book(
                title="The Call of Cthulhu",
                desc="A series of interconnected narratives uncover an ancient cosmic horror, hinting at a world beyond human comprehension.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1567470807i/15730101.jpg",
                page_count=45,
                publish_year=1928,
                author_id=9,
            ),
            Book(
                title="Pattern Recognition",
                desc="Cayce Pollard, a 'coolhunter' with an allergy to branding, is drawn into a global mystery involving cryptic footage and the shadowy underbelly of the internet.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1288326931i/22320.jpg",
                page_count=356,
                publish_year=2003,
                author_id=10,
            ),
            Book(
                title="Cryptonomicon",
                desc="In this intricate tale spanning World War II and the present day, a group of mathematicians, codebreakers, and hackers work to safeguard secrets from the Axis powers while their modern counterparts stumble upon a hidden treasure, intertwining past and present in a web of cryptography, espionage, and technological innovation.",
                cover_image="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327931476i/816.jpg",
                page_count=918,
                publish_year=1999,
                author_id=11,
            ),
        ]
        for book in science_fiction_books:
            db.session.add(book)
            # db.session.commit()
        print("Book seeding complete.")

        # Review seeding
        for num in range(100):
            user = rc(User.query.all())

            add_review = Review(
                rating=rc(range(5)),
                review=fake.text(),
                user_id=user.id,
                book=rc(Book.query.all()),
            )
            db.session.add(add_review)
            db.session.commit()
