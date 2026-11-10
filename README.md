# Virtual Dog Park

A beginner-friendly dog encyclopedia and virtual pet website built for AIE1101 using HTML, CSS, and vanilla JavaScript. Read about three breeds, adopt one virtual dog, and care for it as it grows.

## Features

- Beagle, Golden Retriever, and Poodle entries with size, personality, and everyday care notes.
- Three local SVG dog illustrations and a button that cycles through care tips.
- Adoption form with a breed selector and a dog name of up to 20 characters.
- Dog profile showing name, breed, day, growth stage, and happiness.
- Feed, Play, and Next Day buttons, plus visible growth and happiness bars.
- Automatic saving and restoration of one dog in the same browser.
- Start Over confirmation before removing saved progress.
- Responsive layout, descriptive image alt text, labelled form controls, and keyboard focus styles.

## Preview with a local server

1. Open the `virtual-dog-park` folder in Visual Studio Code.
2. In Extensions, install **Live Server** by **Ritwick Dey** if it is not already available.
3. Right-click `index.html` in the Explorer and choose **Open with Live Server**.
4. Use the local address opened in the browser, for example `http://127.0.0.1:5500`.

No package manager or build step is needed. Keep using the same browser and local address during storage tests. Different hostnames or ports have separate storage: `localhost:5500` and `127.0.0.1:5500` are different addresses. Use the local server rather than opening the page through a `file://` address for storage testing.

## Growth and happiness rules

| Action or day | Result |
| --- | --- |
| Adopt | Day 1, Puppy, happiness 50 |
| Feed | Happiness +10, up to 100 |
| Play | Happiness +10, up to 100 |
| Next Day | Day +1 and happiness -5, down to 0 |
| Day 1 | Puppy; growth bar at 1 of 3 |
| Days 2-3 | Young Dog; growth bar at 2 of 3 |
| Day 4 onward | Adult Dog; growth bar at 3 of 3 |

Next Day simulates time; there is no need to wait for a real day. Names have leading and trailing whitespace removed, cannot be blank, and are limited to 20 characters. Spaces inside a name are preserved. Names are displayed as text, including characters such as `<` and `>`.

## Where saved progress lives

The adopted dog's name, breed, day, and happiness are saved in browser `localStorage` under the key `virtualDogParkPetV1`. Saving happens immediately after adoption and after each Feed, Play, or Next Day action. Refreshing restores that dog, and its growth stage is calculated from the saved day.

Progress belongs to the current browser profile, device, and website address. It is **not stored in a GitHub account**, uploaded by Git, or synced between browsers or devices. Clearing the site's browser data removes its progress. If browser storage is unavailable, the page displays a message explaining that progress cannot be saved.

Start Over asks for confirmation. Cancel keeps the current dog and saved progress. Confirm deletes this project's saved dog and returns to the adoption form.

## Illustrations

`assets/beagle.svg`, `assets/golden-retriever.svg`, and `assets/poodle.svg` are original, project-created SVG illustrations, **not real dog photographs**. They are local files; the page does not depend on an external image website.

## Manual testing checklist

Use this checklist to record your own results in a browser.

- [ ] All three breed entries, illustrations, and care notes display; the care-tip button changes the tip.
- [ ] Empty and spaces-only names are rejected. Try `  Buddy Dog  `, `<Buddy>`, and more than 20 characters: outer spaces are removed, inner spaces remain, special characters display as text, and input stops at 20 characters.
- [ ] Adopt Buddy as a Beagle: the profile shows Buddy, Beagle, Day 1, Puppy, and happiness 50. Try the other breed choices after Start Over.
- [ ] Feed once gives 60 and Play once gives 70. Repeated clicks stop at 100.
- [ ] Next Day adds one day and subtracts 5 happiness. Days 2-3 show Young Dog, Day 4 shows Adult Dog, and the growth bar changes. Repeated days never take happiness below 0.
- [ ] Refresh after adoption and separately after Feed, Play, and Next Day. The latest name, breed, day, happiness, and matching growth stage return.
- [ ] Start Over opens a confirmation. Cancel followed by refresh keeps the dog. Confirm returns to adoption, and another refresh does not bring the old dog back.
- [ ] On a narrow screen, text and controls remain readable without horizontal scrolling. Use Tab and Enter to check links, form controls, and buttons.
