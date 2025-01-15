# Transforms a glb in the project root into glb & tsx
# And handles some weirdness about the output
# Example:
# For "./tree.glb"
# Run "npm run glb tree"
# -> public/models/tree.glb
# -> src/models/TreeModel.tsx

set -ex
input=$1
npx gltfjsx --transform --shadows "${input}.glb"

capitalized_name="$(tr '[:lower:]' '[:upper:]' <<< ${input:0:1})${input:1}"
custom_tsx_location="src/models/${capitalized_name}Model.tsx"
custom_glb_location="public/models/${input}.glb"
transformed_name="${input}-transformed.glb"

# Move transformed glb
mv $transformed_name $custom_glb_location

# Move generated jsx to custom location
mv "${capitalized_name}.jsx" $custom_tsx_location

# Change the useGltf path to the public/models path
replace_this="${transformed_name}"
with_this="models\/${input}.glb"
sed -i '' "s/$replace_this/$with_this/g" $custom_tsx_location

# Change the exported component name to the capitilized name
replace_this="Model"
with_this="${capitalized_name}Model"
sed -i '' "s/$replace_this/$with_this/g" $custom_tsx_location

# Remove props
replace_this="(props)"
with_this="()"
sed -i '' "s/$replace_this/$with_this/g" $custom_tsx_location

# Remove auto-gen comment from jsx
ex -s -c '1d7|x' $custom_tsx_location
