import IDiscordUserDTO from './IDiscordUserDTO';
import IWhoVotedDTO from './IWhoVotedDTO';

export default interface ICreateBanUserDTO {
  votedUser: IDiscordUserDTO;
  whoVote: IWhoVotedDTO;
}
