import type { HotKey } from "@/entities/hot-key/lib";

export const hotKeys: HotKey[] = [
	{ id: 1, title: "Одобрить", color: "green", legend: "Пробел" },
	{ id: 2, title: "Отклонить", color: "orange", legend: "Del" },
	{ id: 3, title: "Эскалация", color: "blue", legend: "Shift+Enter" },
	{ id: 4, title: "Сохранить", legend: "F7" },
];
