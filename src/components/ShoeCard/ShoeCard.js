import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const justReleasedFlagStyle = {
    "new-release": { "--display": "block" },
    "default": { "--display": "none" },
    "on-sale": { "--display": "none" },
  };
  const saleFlagStyle = {
    "on-sale": { "--display": "block" },
    "default": { "--display": "none" },
    "new-release": { "--display": "none" },
  };
  const priceStyle = {
    "on-sale": { "--text-color": COLORS.gray[700], "--text-decoration": "line-through" },
    "default": { "--text-color": COLORS.gray[900], "--text-decoration": "inherit" },
    "new-release": { "--text-color": COLORS.gray[900], "--text-decoration": "inherit" }
  };
  const salePriceStyle = {
    "on-sale": { "--display": "inline" },
    "default": { "--display": "none" },
    "new-release": { "--display": "none" }
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <JustReleasedFlag style={justReleasedFlagStyle[variant]}>
            Just released!
          </JustReleasedFlag>
          <SaleFlag style={saleFlagStyle[variant]}>
            Sale
          </SaleFlag>
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={priceStyle[variant]}>
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <SalePrice style={salePriceStyle[variant]}>
            {formatPrice(salePrice)}
          </SalePrice>
        </Row>
      </Wrapper>
    </Link >
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 0 340px;
`;

const Wrapper = styled.article`
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
  margin-right: auto;
`;

const Price = styled.span`
  color: var(--text-color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
  margin-right: auto;
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  display: var(--display);
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  border-radius: 4px;
  padding: 8px 10px;
  color: ${COLORS.white};
  display: var(--display);
`;

const JustReleasedFlag = styled(Flag)`
  background-color: ${COLORS.secondary};
`;

const SaleFlag = styled(Flag)`
  background-color: ${COLORS.primary};
`;

export default ShoeCard;
