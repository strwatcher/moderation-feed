import { HotKeyDescription } from "@/entities/hot-key/ui/description";
import { hotKeys } from "../lib";
import s from "./hot-keys.module.scss";

export const HotKeys = () => {
	return (
		<dl className={s.root}>
			{hotKeys.map((hotKey) => (
				<HotKeyDescription key={hotKey.id} hotKey={hotKey} />
			))}
		</dl>
	);
};
