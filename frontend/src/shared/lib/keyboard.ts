import type { KeyboardEvent as KeyboardEventReact } from "react";

export type CommonKeyboardEvent = KeyboardEvent | KeyboardEventReact;
export type CommonKeyboardEventHandler<E extends CommonKeyboardEvent> = (
	event: E,
) => void;

export const compose =
	<E extends CommonKeyboardEvent>(
		...handlers: CommonKeyboardEventHandler<E>[]
	) =>
		(event: E) => {
			handlers.forEach((handler) => handler(event));
		};

export const hasNoModifiers = (event: CommonKeyboardEvent) =>
	!event.ctrlKey && !event.shiftKey && !event.metaKey;

export const hasShiftModifier = (event: CommonKeyboardEvent) =>
	!event.ctrlKey && !event.metaKey && event.shiftKey;

type KeyboardEventPredicate<E extends CommonKeyboardEvent> = (
	event: E,
) => boolean;

export const createKeyboardHandler =
	(predicate: KeyboardEventPredicate<CommonKeyboardEvent>) =>
		<E extends CommonKeyboardEvent>(action: (event: E) => void) =>
			(event: E) => {
				if (predicate(event)) {
					event.preventDefault();
					event.stopPropagation();
					action(event);
				}
			};

export const logKeyboardEvent = (event: CommonKeyboardEvent) =>
	console.log(event);

export const handleSpace = createKeyboardHandler(
	(event) => event.code === "Space" && hasNoModifiers(event),
);

export const handleDel = createKeyboardHandler(
	(event) => event.code === "Delete" && hasNoModifiers(event),
);

export const handleF7 = createKeyboardHandler(
	(event) => event.code === "F7" && hasNoModifiers(event),
);

export const handleEnter = createKeyboardHandler(
	(event) => event.code === "Enter" && hasNoModifiers(event),
);

export const handleShiftEnter = createKeyboardHandler(
	(event) => event.code === "Enter" && hasShiftModifier(event),
);
