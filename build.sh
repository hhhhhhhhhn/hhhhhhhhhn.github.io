#!/bin/sh

cd `dirname $0`
rm -rf dist/

cp -r src/ dist/

IFS=$'\n'

for file in `find -L dist/ -type f`; do
	cat "$file" | tr "\n" "\f" > /tmp/bush
	cat /tmp/bush > "$file"
	for script in `cat "$file" | grep -o "{{[^}]*}}"`; do
		echo "${script:2:-2}" | tr "\f" "\n" > /tmp/bush.sh
		chmod +x /tmp/bush.sh
		. /tmp/bush.sh | tr "\n" "\f" | xargs -I {} sed -i "s/${script}/{}/" "$file"
	done
	cat "$file" | tr "\f" "\n" > /tmp/bush
	cat /tmp/bush > "$file"
done
