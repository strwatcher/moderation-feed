import type { Meta, StoryObj } from "@storybook/react";
import { BriefCard, type BriefCardProps } from "./index";
import { fn } from "@storybook/test";

const args: BriefCardProps = {
	hasFocus: false,
	onClick: fn(),
	brief: {
		id: 9032039023,
		ownerId: 1290192094,
		ownerLogin: "ownerLogin",
		bulletinSubject: "Оператор на входящие звонки (Владивосток)",
		bulletinText: `В связи с расширением отдела мы ищем сотрудника в нашу большую команду #ФАРПОСТВСЕСВОИ

Если ты общительный и любознательный, мечтаешь построить карьеру, найти друзей и изменить мир к лучшему, то нам по пути.
Ты будешь:
- принимать входящие звонки от пользователей сайтов FarPost.ru, VL.ru, Drom.ru;
- помогать пользователям решать самые разные задачи и находить выход из нестандартных ситуаций.
Никаких продаж и «холодных» звонков!

Юность и отсутствие опыта - не помеха. Наша команда и специалист по обучению помогут тебе стать крутым профи в общении с клиентами. Обучение будет состоять из нескольких этапов теории и практики. При этом ты будешь официально оформлен уже с первого рабочего дня.`,
		bulletinImages: [
			"https://cdn.pixabay.com/photo/2016/07/29/09/35/diving-1551764_960_720.jpg",
		],
		publishDate: 0,
		publishDateString: "16:29, сегодня",
	},
};

const meta: Meta<typeof BriefCard> = {
	title: "entities/brief/card",
	component: BriefCard,
	args,
};

export default meta;

type Story = StoryObj<typeof BriefCard>;

export const Defatult: Story = {};

export const WithScrolls: Story = {
	args: {
		brief: {
			...args.brief,
			bulletinText: args.brief.bulletinText.repeat(10),
			bulletinImages: Array.from({ length: 10 }).map(
				() => args.brief.bulletinImages[0],
			),
		},
	},
};
