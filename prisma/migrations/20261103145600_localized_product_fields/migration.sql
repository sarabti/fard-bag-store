-- Migrate flat bilingual columns to JSON { fa, en } objects
ALTER TABLE "Product" ADD COLUMN "name" JSONB NOT NULL DEFAULT '{"fa":"","en":""}'::jsonb;
ALTER TABLE "Product" ADD COLUMN "description" JSONB NOT NULL DEFAULT '{"fa":"","en":""}'::jsonb;
ALTER TABLE "Product" ADD COLUMN "category" JSONB NOT NULL DEFAULT '{"fa":"","en":""}'::jsonb;

UPDATE "Product" SET
  "name" = jsonb_build_object('fa', "name_fa", 'en', "name_en"),
  "description" = jsonb_build_object('fa', "description_fa", 'en', "description_en"),
  "category" = jsonb_build_object('fa', "category_fa", 'en', "category_en");

ALTER TABLE "Product" ALTER COLUMN "name" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "description" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "category" DROP DEFAULT;

ALTER TABLE "Product" DROP COLUMN "name_fa";
ALTER TABLE "Product" DROP COLUMN "name_en";
ALTER TABLE "Product" DROP COLUMN "description_fa";
ALTER TABLE "Product" DROP COLUMN "description_en";
ALTER TABLE "Product" DROP COLUMN "category_fa";
ALTER TABLE "Product" DROP COLUMN "category_en";
