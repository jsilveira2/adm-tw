import { string, boolean, z } from 'zod';

export const partyMembersSchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
    partyLeader: boolean().optional().nullable(),
    obs: string().optional().nullable(),
    characterId: string().uuid({ message: 'Invalid Character Event ID' }),
    pvpPartyId: string().uuid({ message: 'Invalid PvP Party ID' })
});

export type PartyMembers = z.infer<typeof partyMembersSchema>;