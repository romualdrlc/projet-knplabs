export class DomainEntityPlayer {

  private id: number;
  private name: string;
  private score: number;

  constructor({
                id = 0,
                name = '',
                score = 0
              }: {
    id?: number,
    name?: string,
    score?: number,
  }) {
    this.id = id;
    this.name = name;
    this.score = score;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getScore(): number {
    return this.score;
  }

  setNewScore(score: number) {
    this.score = score;
  }
}
