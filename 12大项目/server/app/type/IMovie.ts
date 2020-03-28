// 电影
export interface IMovie {
	id?: number;
	name: string;
	type: string;
	areas: string;
	timeLong: number;
	isHot?: boolean;
	isComing?: boolean;
	isClassic?: boolean;
	description?: string;
	poster?: string;
}
