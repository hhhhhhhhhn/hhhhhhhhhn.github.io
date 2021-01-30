#!/bin/sh

SRC="src"
DIST="docs"

cd `dirname $0`
rm -rf "$DIST/"

cp -r "$SRC/" "$DIST/"

IFS=$'\n'

function template() { # writes to /tmp/bush
	cat | tr "\n" "\f" > /tmp/bush
	cat /tmp/bush > "$file"
	for script in `cat "$file" | grep -o "{{[^}]*}}"`; do
		echo "${script:2:-2}" | tr "\f" "\n" > /tmp/bush.sh
		chmod +x /tmp/bush.sh
		. /tmp/bush.sh | tr "\n" "\f" | head -c -1 \
			| xargs -I {} sed -i "s/${script}/{}/" "$file"
	done
	cat "$file" | tr "\f" "\n" > /tmp/bush
}

for file in `find -L "$DIST/" -type f -not -path '*/\.*'`; do
	template <"$file"
	cat /tmp/bush > "$file"
done

for file in `find -L "$DIST/" -type f -path '*/\.*'`; do
	. "$file"
	rm "$file"
done
