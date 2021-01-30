export default interface IDiscordUserDTO {
  id: string;
  username: string;
  avatar: string | null;
  bot?: boolean;
}
