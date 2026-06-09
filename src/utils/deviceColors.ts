const PALETTE = [
	"#E53935", // red
	"#1E88E5", // blue
	"#FB8C00", // amber
	"#8E24AA", // purple
	"#00ACC1", // cyan
	"#43A047", // green
	"#F4511E", // deep orange
	"#3949AB", // indigo
];

export const getDeviceColor = (index: number): string =>
	PALETTE[index % PALETTE.length];
