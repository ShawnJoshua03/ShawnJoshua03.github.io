// Interests, from Shawn's own answers. Missing specifics are TODOs (shown in dev only).

export interface Interest {
  id: string;
  title: string;
  line: string;
  todo: string;
}

export const INTERESTS: Interest[] = [
  { id: 'piano', title: 'Piano', line: 'I play. Requests are taken, not guaranteed.', todo: 'what you play and for how long' },
  { id: 'vlogs', title: 'Vlogs', line: 'I film and edit my own. The editor and the subject agree on most cuts.', todo: 'link to the channel' },
  { id: 'food', title: 'Food', line: 'Massive foodie, by my own description, which I stand by.', todo: 'a favorite dish, a Cincinnati spot, and the food you miss from Dubai' },
  { id: 'travel', title: 'Travel & beaches', line: 'Will go anywhere with a coastline.', todo: 'favorite beach, places visited' },
  { id: 'magnets', title: 'Fridge magnets', line: 'I collect as many as possible. Fridge capacity is under review.', todo: 'how many, and the best one' },
];
