import { atomWithStorage } from 'jotai/utils';

export const selectedCharaterAtom = atomWithStorage<string | null>('selectedCharacter', null);
