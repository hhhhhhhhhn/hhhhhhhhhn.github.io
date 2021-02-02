#!/bin/sh

SRC="src"
DIST="docs"

cd `dirname $0`
rm -rf "$DIST/"

cp -r "$SRC/" "$DIST/"

function template() {
	IN_BRACKETS=0
	IN_SCRIPT=0
	while IFS= read -d '' -rn1 chr; do
		if [ "$chr" = "{" ]; then
			if [ "$IN_BRACKETS" = 0 ]; then
				IN_BRACKETS="{"
			else
				IN_BRACKETS=0
				IN_SCRIPT=1
				printf "" > /tmp/bush
			fi
		elif [ "$chr" = "}" ] && [ "$IN_SCRIPT" = 1 ]; then
			if [ "$IN_BRACKETS" = 0 ]; then
				IN_BRACKETS="}"
			else
				IN_BRACKETS=0
				IN_SCRIPT=0
				. /tmp/bush | head -c -1
			fi
		else
			if [ ! "$IN_BRACKETS" = 0 ]; then
				chr="$IN_BRACKETS$chr"
			fi
			IN_BRACKETS=0
			if [ "$IN_SCRIPT" = 1 ]; then
				printf "%s" "$chr" >> /tmp/bush
			else
				printf "%s" "$chr"
			fi
		fi
	done
}

for file in `find -L "$DIST/" -type f -not -path '*/\.*'`; do
	template <"$file" >/tmp/bush2
	cat /tmp/bush2 > "$file"
done

for file in `find -L "$DIST/" -type f -path '*/\.*'`; do
	. "$file"
	rm "$file"
done
